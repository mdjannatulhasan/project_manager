class ExampleCallbackModel < ApplicationRecord
    # === BEFORE CALLBACKS ===
    before_validation :set_defaults
    before_save :process_data
    before_create :generate_uuid
    before_update :track_changes
    before_destroy :cleanup_resources

    # === AFTER CALLBACKS ===
    after_initialize :set_initial_state
    after_find :log_find
    after_create :send_welcome_email
    after_update :notify_subscribers
    after_destroy :log_deletion

    # === COMMIT CALLBACKS (after database transaction commits) ===
    after_create_commit :broadcast_to_websocket
    after_update_commit :update_cache
    after_destroy_commit :cleanup_files

    # === VALIDATION CALLBACKS ===
    before_validation :normalize_data
    after_validation :log_validation_errors

    # === ROLLBACK CALLBACKS (if transaction fails) ===
    after_rollback :log_failure

    private

    def set_defaults
        puts "🔄 Setting defaults before validation"
        self.status ||= "pending"
    end

    def process_data
        puts "⚙️ Processing data before save"
        self.processed_at = Time.current
    end

    def generate_uuid
        puts "🆔 Generating UUID before create"
        self.uuid = SecureRandom.uuid
    end

    def track_changes
        puts "📝 Tracking changes before update"
        self.updated_count = (updated_count || 0) + 1
    end

    def cleanup_resources
        puts "🧹 Cleaning up resources before destroy"
        # Remove associated files, etc.
    end

    def set_initial_state
        puts "🎯 Setting initial state after initialize" # Called when object is created with .new
    end

    def log_find
        puts "🔍 Logging find operation" # Called after .find, .where, etc.
    end

    def send_welcome_email
        puts "📧 Sending welcome email after create" # Send email, notification, etc.
    end

    def notify_subscribers
        puts "📢 Notifying subscribers after update" # Update related models, send notifications
    end

    def log_deletion
        puts "🗑️ Logging deletion" # Log to audit trail
    end

    def broadcast_to_websocket
        puts "📡 Broadcasting to WebSocket after commit" # Our chat example: ActionCable.server.broadcast(...)
    end

    def update_cache
        puts "💾 Updating cache after commit" # Update Redis cache, CDN, etc.
    end

    def cleanup_files
        puts "🗂️ Cleaning up files after commit" # Remove uploaded files, thumbnails, etc.
    end

    def normalize_data
        puts "🔧 Normalizing data before validation"
        self.email = email.downcase.strip if email.present?
    end

    def log_validation_errors
        puts "❌ Logging validation errors" if errors.any?
    end

    def log_failure
        puts "💥 Transaction failed - logging failure"
    end
end
