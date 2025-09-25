class ChatChannel < ApplicationCable::Channel
    def subscribed
        stream_from "chat_channel"
    end

    def unsubscribed
        # Any cleanup needed when channel is unsubscribed
    end

    def speak(data)
        # Create new message when received from client
        begin
            ChatMessage.create!(
                user_name: data["user_name"],
                message: data["message"],
            )
        rescue => e
            Rails.logger.error "Failed to create chat message: #{e.message}"
        end
    end
end
