class IrregularVerbsController < ApplicationController
  before_action :set_irregular_verb, only: [:show, :update, :destroy]

  # GET /irregular_verbs
  def index
    @irregular_verbs = IrregularVerb.all.order(Arel.sql('random()'))
    @irregular_verbs = paginate(@irregular_verbs)

    render json: @irregular_verbs
  end

  # GET /irregular_verbs/1
  def show
    render json: @irregular_verb
  end

  # POST /irregular_verbs
  def create
    @irregular_verb = IrregularVerb.new(irregular_verb_params)

    if @irregular_verb.save
      render json: @irregular_verb, status: :created, location: @irregular_verb
    else
      render json: @irregular_verb.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /irregular_verbs/1
  def update
    if @irregular_verb.update(irregular_verb_params)
      render json: @irregular_verb
    else
      render json: @irregular_verb.errors, status: :unprocessable_entity
    end
  end

  # DELETE /irregular_verbs/1
  def destroy
    @irregular_verb.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_irregular_verb
      @irregular_verb = IrregularVerb.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def irregular_verb_params
      params.require(:irregular_verb).permit(:base, :past_tense, :past_participle)
    end
end
