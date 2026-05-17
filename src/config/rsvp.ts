/**
 * RSVP Engine Configuration
 * Edit this file to configure the RSVP form destination, responses, and notification channels.
 * 
 * Every future client can use the SAME RSVP engine by modifying only this config file.
 */

export interface RSVPConfig {
  /**
   * Toggle to enable or disable the RSVP system completely.
   */
  enabled: boolean;

  /**
   * Google Apps Script Web App URL for Google Sheet integration.
   * Send POST requests to this URL to log RSVPs.
   */
  appsScriptUrl: string;

  /**
   * Custom labels and placeholders to translate or adjust tone.
   */
  labels: {
    eyebrow: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    guestsLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    deadlineMessage: string;
  };

  /**
   * The message shown on successful submission.
   * Use {name} to personalize the title or description dynamically.
   */
  successMessage: {
    title: string;
    description: string;
  };

  /**
   * Cinematic premium loading messages to cycle through during AJAX submission.
   */
  loadingMessages: string[];

  /**
   * Optional configurations for guest limits.
   */
  guestLimit?: {
    min: number;
    max: number;
    default: number;
  };

  /**
   * Optional Telegram integration metadata.
   * Allows real-time RSVP alerts to be sent straight to a Telegram chat.
   */
  telegram?: {
    enabled: boolean;
    botToken: string;
    chatId: string;
    /**
     * Supports placeholders: {name}, {count}, {message}
     */
    customMessageTemplate?: string;
  };

  /**
   * Optional Google Sheet integration metadata for developer reference.
   */
  googleSheet?: {
    enabled: boolean;
    spreadsheetId?: string;
    sheetName?: string;
  };

  /**
   * Optional Analytics and Event Tracking.
   */
  analytics?: {
    enabled: boolean;
    eventName?: string;
  };
}

export const rsvpConfig: RSVPConfig = {
  enabled: true,
  // Insert your deployed Google Apps Script Web App URL here
  appsScriptUrl: "https://script.google.com/macros/s/AKfycbw6Nl-T8_uH4c8nQ1WjJ0_5sXW4_RsvpPlaceholder/exec",
  labels: {
    eyebrow: "RSVP",
    title: "Will you join us?",
    subtitle: "Your presence is our greatest blessing.",
    nameLabel: "Your Name",
    namePlaceholder: "Enter your full name",
    guestsLabel: "Number of Guests",
    messageLabel: "A Blessing or Message",
    messagePlaceholder: "Share your wishes for our new beginning...",
    submitButton: "Accept Invitation",
    deadlineMessage: "Kindly respond by {deadline}."
  },
  successMessage: {
    title: "Thank you, {name}",
    description: "Your blessings have reached us. We are absolutely thrilled to celebrate these sacred moments with you."
  },
  loadingMessages: [
    "Sending blessings to the cloud...",
    "Securing your seats at the mandap...",
    "Notifying the bride & groom...",
    "Wrapping your warm wishes..."
  ],
  guestLimit: {
    min: 1,
    max: 15,
    default: 1
  },
  telegram: {
    enabled: false,
    botToken: "YOUR_TELEGRAM_BOT_TOKEN",
    chatId: "YOUR_TELEGRAM_CHAT_ID",
    customMessageTemplate: "✨ *New RSVP Received* ✨\n\n👤 *Name:* {name}\n👥 *Guests:* {count}\n💌 *Message:* {message}\n\n💖 Sent with love from the Wedding Portal"
  },
  googleSheet: {
    enabled: false,
    spreadsheetId: "YOUR_SPREADSHEET_ID",
    sheetName: "RSVP Responses"
  },
  analytics: {
    enabled: false,
    eventName: "RSVP_Submission"
  }
};

export default rsvpConfig;
