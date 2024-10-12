from groq_ai import GroqAI
from flask import Flask, jsonify, request
from flask_cors import CORS
# import json
# from Tools.chatbot_tools import ChatbotTools
# from Tools.handle_db import HandleDB



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

# """
# route to search the internet using duck duck go 
# """
# @app.route('/search-internet', methods=['POST'])
# def search_internet():
#     data = request.get_json()
#     db_handler = HandleDB('data/news.db')
#     chatbot_tools = ChatbotTools()
#     result = chatbot_tools.search_tool_duckduckgo(data['text'])
#     db_handler.save_data([(5,result)])
#     return result

# """
# combination of the bot and searching 
# """
# @app.route('/predict-search', methods=['POST'])
# def predict_search():
#     system = """ You are a trading expert with 20 years of experience
#     - You have deep understanding of trading cryptocurrency
#     - You have deep understanding of trading options
#     - You deeply understang candle stick pattenrs
#     - You deeply understand the concept of supply and demand
#     - You are aware of the institutional market manipulation and their target to liquidate day traders
#     - You are aware of the high volatility of the BTC market
#     - You deeply understand risk management
#     - You also have access to these information {text}

# """
#     data = request.get_json()
#     chatbot_tools = ChatbotTools()
#     result = chatbot_tools.search_tool_duckduckgo(data['text'])
#     groq_ai = GroqAI(system_prompt=system)
#     response = groq_ai.generate_response(data['text'] + str(result[:5]))
#     return response

# """

# """
# @app.route('/set-item-price', methods=['POST'])
# def set_item_price():
#     chatbot_tools = ChatbotTools()
#     chatbot_tools.set_gold_price_tool()


if __name__ == "__main__":
    app.run(debug=True)

