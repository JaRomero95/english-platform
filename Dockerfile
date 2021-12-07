# syntax=docker/dockerfile:1
FROM ruby:2.7.4
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
WORKDIR /app

ENV RAILS_ENV production

COPY server/Gemfile /app/Gemfile
COPY server/Gemfile.lock /app/Gemfile.lock

RUN bundle config --global frozen 1
RUN bundle install --without development test

RUN gem install bundler -v 2.2.31
RUN bundle install

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Configure the main process to run when running the image
CMD ["rails", "server", "-b", "0.0.0.0"]