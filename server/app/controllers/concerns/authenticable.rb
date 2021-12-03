module Authenticable
  def authenticate!
    raise UnauthorizedError, 'Invalid token' unless user_id

    @user = User.find(user_id)
  end

  def current_user
    @user
  end

  def user_id
    decoded_token[0]['user_id']
  end

  def decoded_token
    JWT.decode(received_token, jwt_secret, true, algorithm: jwt_algorithm)
  rescue JWT::DecodeError
    raise UnauthorizedError, 'JWT::DecodeError'
  end

  def jwt_secret
    Rails.configuration.x.jwt_secret
  end

  def jwt_algorithm
    Rails.configuration.x.jwt_algorithm
  end

  def received_token
    header_token = request.headers['Authorization']

    raise UnauthorizedError, 'No Authorization header present' unless header_token

    header_token.split(' ').last
  end
end

class UnauthorizedError < StandardError; end
