class Api::ChatMessagesController < ApplicationController
  def index
    # Get last 50 messages ordered by creation time
    messages = ChatMessage.order(created_at: :desc).limit(50).reverse
    
    render json: messages.map do |message|
      {
        id: message.id,
        user_name: message.user_name,
        message: message.message,
        created_at: message.created_at.strftime('%H:%M')
      }
    end
  end
end
