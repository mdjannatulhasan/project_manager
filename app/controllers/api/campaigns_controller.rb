class Api::CampaignsController < ApplicationController
    protect_from_forgery with: :null_session
    before_action :set_campaign, only: %i[show update destroy]

    # GET /api/campaigns
    def index
        @campaigns = Campaign.all.order(:created_at)
        render json: @campaigns
    end

    # GET /api/campaigns/:id
    def show
        render json: @campaign
    end

    # POST /api/campaigns
    def create
        @campaign = Campaign.new(campaign_params)

        if @campaign.save
            render json: @campaign, status: :created
        else
            render json: {
                       errors: @campaign.errors,
                   },
                   status: :unprocessable_entity
        end
    end

    # PATCH/PUT /api/campaigns/:id
    def update
        if @campaign.update(campaign_params)
            render json: @campaign
        else
            render json: {
                       errors: @campaign.errors,
                   },
                   status: :unprocessable_entity
        end
    end

    # DELETE /api/campaigns/:id
    def destroy
        @campaign.destroy
        head :no_content
    end

    private

    def set_campaign
        @campaign = Campaign.find(params[:id])
    end

    def campaign_params
        params.require(:campaign).permit(:name, :description, :status)
    end
end
