import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// Custom inline build-time SEO plugin to pre-populate open graph tags for search engine and chat crawlers (WhatsApp/Telegram/iMessage)
function seoPlugin() {
  return {
    name: "vite-plugin-seo-inject",
    transformIndexHtml(html: string) {
      try {
        // Read active client ID dynamically
        const activeClientFile = fs.readFileSync(
          path.resolve(__dirname, "./src/clients/active-client.ts"),
          "utf-8"
        );
        const match = activeClientFile.match(/ACTIVE_CLIENT_ID\s*=\s*["']([^"']+)["']/);
        const coupleId = match ? match[1] : "priya-aarav";

        // Read client's wedding json
        const weddingJson = fs.readFileSync(
          path.resolve(__dirname, `./src/clients/${coupleId}/wedding.json`),
          "utf-8"
        );
        const clientData = JSON.parse(weddingJson);

        const title = clientData.seo?.title || `The Wedding Celebration of ${clientData.groomName || "Groom"} ❤️ ${clientData.brideName || "Bride"}`;
        const description = clientData.seo?.description || "A Cinematic Wedding Invitation. Join us as we celebrate love, family, and forever.";
        const baseUrl = clientData.seo?.url || "https://wedding-invitation-portal.vercel.app";
        const relativeOgImage = `/media/${coupleId}/${clientData.seo?.ogImage || "hero.jpg"}`;
        
        const absoluteOgImage = relativeOgImage.startsWith("http")
          ? relativeOgImage
          : `${baseUrl.replace(/\/$/, "")}${relativeOgImage.startsWith("/") ? "" : "/"}${relativeOgImage}`;

        const tags = `
    <!-- Search Engine & SEO Metadata -->
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="keywords" content="${clientData.seo?.keywords || "wedding, invitation"}" />
    <meta name="author" content="HinduInvites" />
    
    <!-- OpenGraph Facebook / WhatsApp Metadata -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${absoluteOgImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:url" content="${baseUrl}" />
    <meta property="og:site_name" content="HinduInvites" />

    <!-- Twitter Card Metadata -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="${clientData.seo?.twitterHandle || "@HinduInvites"}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${absoluteOgImage}" />
        `;

        // Replace the default title or simple header tags in index.html with our rich OpenGraph block
        return html.replace(/<title>.*?<\/title>/, tags);
      } catch (err) {
        console.error("Vite SEO plugin transform error:", err);
        return html;
      }
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    tailwindcss(),
    TanStackRouterVite(),
    seoPlugin(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
