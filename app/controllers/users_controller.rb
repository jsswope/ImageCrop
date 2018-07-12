class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def index

    @user = User.all
  end

  def show
  end

  def new
    @user = User.new
  end

  def edit
  end

  def create
    @user = User.new(user_params)
    if @user.save
      if params[:user][:avatar].present?
        render :crop
      else
        redirect_to @user, notice: "Successfully created user."
      end
    else
      render :new
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      if params[:user][:avatar].present?
        render :crop
      else
        redirect_to @user, notice: "Successfully updated user."
      end
    else
      render :new
    end
  end

  def destroy
    @user.destroy
    redirect_to users_url, notice: 'User was successfully destroyed.'
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    # ever trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:name, :avatar, :crop_x, :crop_y, :crop_w, :crop_h)
    end
end
