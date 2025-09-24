class Api::Campaigns::TasksController < ApplicationController
    protect_from_forgery with: :null_session
    before_action :set_campaign
    before_action :set_task, only: %i[show update destroy]

    # GET /api/campaigns/:campaign_id/tasks
    def index
        @tasks = @campaign.tasks.order(:created_at)
        render json: @tasks
    end

    # GET /api/campaigns/:campaign_id/tasks/:id
    def show
        render json: @task
    end

    # POST /api/campaigns/:campaign_id/tasks
    def create
        @task = @campaign.tasks.build(task_params)

        if @task.save
            render json: @task, status: :created
        else
            render json: { errors: @task.errors }, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /api/campaigns/:campaign_id/tasks/:id
    def update
        if @task.update(task_params)
            render json: @task
        else
            render json: { errors: @task.errors }, status: :unprocessable_entity
        end
    end

    # DELETE /api/campaigns/:campaign_id/tasks/:id
    def destroy
        @task.destroy
        head :no_content
    end

    private

    def set_campaign
        @campaign = Campaign.find(params[:campaign_id])
    end

    def set_task
        @task = @campaign.tasks.find(params[:id])
    end

    def task_params
        params.require(:task).permit(:title, :completed)
    end
end
