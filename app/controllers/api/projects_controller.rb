class Api::ProjectsController < ApplicationController
    protect_from_forgery with: :null_session
    before_action :set_project, only: %i[show update destroy]

    # GET /api/projects
    def index
        @projects = Project.all

        # Filtering
        @projects = @projects.where(status: params[:status]) if params[:status]
            .present?
        @projects =
            @projects.where("name LIKE ?", "%#{params[:search]}%") if params[
            :search
        ].present?

        # Sorting
        sort_by = params[:sort] || "created_at"
        sort_order = params[:order] || "desc"
        @projects = @projects.order("#{sort_by} #{sort_order}")

        # Pagination
        page = params[:page]&.to_i || 1
        per_page = params[:per_page]&.to_i || 10
        per_page = [per_page, 100].min # Max 100 items per page

        @projects = @projects.limit(per_page).offset((page - 1) * per_page)

        # Response with metadata
        total_count = Project.count
        total_pages = (total_count.to_f / per_page).ceil

        render json: {
                   data: @projects,
                   meta: {
                       page: page,
                       per_page: per_page,
                       total_count: total_count,
                       total_pages: total_pages,
                       has_next_page: page < total_pages,
                       has_prev_page: page > 1,
                   },
               }
    end

    # GET /api/projects/:id
    def show
        render json: @project
    end

    # POST /api/projects
    def create
        @project = Project.new(project_params)

        if @project.save
            render json: @project, status: :created
        else
            render json: {
                       errors: @project.errors,
                   },
                   status: :unprocessable_entity
        end
    end

    # PATCH/PUT /api/projects/:id
    def update
        if @project.update(project_params)
            render json: @project
        else
            render json: {
                       errors: @project.errors,
                   },
                   status: :unprocessable_entity
        end
    end

    # DELETE /api/projects/:id
    def destroy
        @project.destroy
        head :no_content
    end

    private

    def set_project
        @project = Project.find(params[:id])
    end

    def project_params
        params.require(:project).permit(:name, :description, :status)
    end
end
