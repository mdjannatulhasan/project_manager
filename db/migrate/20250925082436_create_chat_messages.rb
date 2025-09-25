class CreateChatMessages < ActiveRecord::Migration[8.0]
  def change
    create_table :chat_messages do |t|
      t.string :user_name
      t.text :message

      t.timestamps
    end
  end
end
