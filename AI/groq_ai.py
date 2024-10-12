import os
import dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
import json 


dotenv.load_dotenv() #load dotenv variables


class GroqAI():
    # constructor 
    def __init__(self, system_prompt): 
        # member variables 
        self.api_key = os.environ['GROQ_API']
        # chatgroq, constructor for the groq API 
        self.chat = ChatGroq(temperature=0, groq_api_key=self.api_key, model_name="llama3-70b-8192")
        self.system = system_prompt
        self.human = "{text}"
        # Constructor from langchain to create a system and user prompt 
        self.prompt = ChatPromptTemplate.from_messages([("system", self.system), ("human", self.human)])
        # chain the commands 
        self.chain = self.prompt | self.chat 

    # invoke the model chain 
    def generate_response(self, text):
        response =  self.chain.invoke({"text": text})
        response_json = response.json()
        response_format = json.loads(response_json)
        return response_format['content']
    

# def main():
#     groq = GroqAI("You are trader with 20 years of experience")
#     response = groq.generate_response("what is the price of gold")
#     print(type(response))
#     print(response)

# main()