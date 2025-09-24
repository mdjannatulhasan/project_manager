class Api::Projects::TasksController < ApplicationController
    protect_from_forgery with: :null_session
    before_action :set_project
    before_action :set_task, only: %i[show update destroy]

    # GET /api/projects/:project_id/tasks
    def index
        @tasks = @project.tasks.order(:created_at)
        render json: @tasks
    end

    # GET /api/projects/:project_id/tasks/:id
    def show
        render json: @task
    end

    # POST /api/projects/:project_id/tasks
    def create
        @task = @project.tasks.build(task_params)

        if @task.save
            render json: @task, status: :created
        else
            render json: { errors: @task.errors }, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /api/projects/:project_id/tasks/:id
    def update
        if @task.update(task_params)
            render json: @task
        else
            render json: { errors: @task.errors }, status: :unprocessable_entity
        end
    end

    # DELETE /api/projects/:project_id/tasks/:id
    def destroy
        @task.destroy
        head :no_content
    end

    private

    def set_project
        @project = Project.find(params[:project_id])
    end

    def set_task
        @task = @project.tasks.find(params[:id])
    end

    def task_params
        params.require(:task).permit(:title, :completed)
    end
end
