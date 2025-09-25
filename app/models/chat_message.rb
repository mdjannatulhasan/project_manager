class ChatMessage < ApplicationRecord
    validates :user_name, presence: true, length: { maximum: 50 }
    validates :message, presence: true, length: { maximum: 500 }

    # Broadcast to Action Cable after creation
    after_create_commit :broadcast_message

    private

    def broadcast_message
        ActionCable.server.broadcast(
            "chat_channel",
            {
                id: id,
                user_name: user_name,
                message: message,
                created_at: created_at.strftime("%H:%M"),
            },
        )
    end
end
