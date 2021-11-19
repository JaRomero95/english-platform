module Authenticable
  def authenticate!
    @user = User.first
  end

  def current_user
    @user
  end
end
