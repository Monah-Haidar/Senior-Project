from groq_ai import GroqAI
from flask import Flask, jsonify, request
from flask_cors import CORS




app = Flask(__name__)
CORS(app)

"""
This routes calls the trading bot groq model
"""
@app.route('/trading-bot', methods=['POST'])
def trading_bot():
    print(request.get_json())
    system = """ You are a trading expert with 20 years of experience
    - You have deep understanding of trading cryptocurrency
    - You have deep understanding of trading options
    - You deeply understang candle stick pattenrs
    - You deeply understand the concept of supply and demand
    - You are aware of the institutional market manipulation and their target to liquidate day traders
    - You are aware of the high volatility of the BTC market
    - You deeply understand risk management
    - Give an overall summary about the whole analysis you wrote in the text in 10 lines
    """
    data = request.get_json()
    groq_ai = GroqAI(system_prompt=system)
    response = groq_ai.generate_response(data['text'])
    print(response)
    return jsonify({'response': response})



if __name__ == "__main__":
    app.run(debug=True)

