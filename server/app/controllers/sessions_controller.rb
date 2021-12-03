class SessionsController < ApplicationController
  def create
    user = User.find_by(email: email)

    return head :unprocessable_entity unless password && user && user.authenticate(password)

    token = user_token(user)

    render json: show_response({ token: token }), status: :created
  end

  private

  def user_token(user)
    payload = { user_id: user.id, created_at: Time.zone.now }
    JWT.encode(payload, jwt_secret, jwt_algorithm) # FIXME: extract JWT calls to app service
  end

  def jwt_algorithm
    Rails.configuration.x.jwt_algorithm
  end

  def jwt_secret
    Rails.configuration.x.jwt_secret
  end

  def email
    create_params[:email]
  end

  def password
    create_params[:password]
  end

  def create_params
    @create_params ||= params.require(:data).permit(:email, :password)
  end
end
