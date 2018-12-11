# -*- coding: utf-8 -*-
import requests


class YunPian(object):

    def __init__(self, api_key):
        self.api_key = api_key
        self.single_send_url = "https://sms.yunpian.com/v2/sms/single_send.json"

    def send_sms(self, code, mobile):
        parmas = {
            "apikey": self.api_key,
            "mobile": mobile,
            "text": "【少儿可视化编程】{code}(#YaK#手机验证码，请完成验证)，如非本人操作，请忽略本短信".format(code=code)
        }

        response = requests.post(self.single_send_url, data=parmas)
        import json
        re_dict = json.loads(response.text)
        # print(re_dict)
        return re_dict


if __name__ == "__main__":
    yunpian = YunPian("103b5a7cece5fe72d9f888fb36abc0fe")
    yunpian.send_sms("2017", "18801796642")
