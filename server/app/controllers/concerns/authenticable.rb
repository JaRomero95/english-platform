module Authenticable
  def authenticate!
    @user = User.order(created_at: :asc).first
  end

  def current_user
    @user
  end
end
