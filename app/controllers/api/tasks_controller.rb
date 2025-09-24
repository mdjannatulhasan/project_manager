class Api::TasksController < ApplicationController
    protect_from_forgery with: :null_session
    before_action :set_task, only: %i[show update destroy]

    # GET /api/tasks
    def index
        @tasks = Task.all.order(:created_at)
        render json: @tasks
    end

    # GET /api/tasks/:id
    def show
        render json: @task
    end

    # POST /api/tasks
    def create
        @task = Task.new(task_params)

        if @task.save
            render json: @task, status: :created
        else
            render json: { errors: @task.errors }, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /api/tasks/:id
    def update
        if @task.update(task_params)
            render json: @task
        else
            render json: { errors: @task.errors }, status: :unprocessable_entity
        end
    end

    # DELETE /api/tasks/:id
    def destroy
        @task.destroy
        head :no_content
    end

    private

    def set_task
        @task = Task.find(params[:id])
    end

    def task_params
        params.require(:task).permit(:title, :completed)
    end
end
