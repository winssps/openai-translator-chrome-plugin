document.addEventListener("DOMContentLoaded", function () {

  return;
  // 打开小图表的html就会执行下面的代码
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    // sendMessage 方法有三个参数，第一个参数是要发送消息的选项卡的ID（可以使用 chrome.tabs.query 方法获取），
    // 第二个参数是一个包含消息内容和其他可选属性的对象，第三个参数是一个可选的回调函数，用于处理接收到的响应。
    chrome.tabs.sendMessage(tabs[0].id, { message: "getSelectedText" }, function (response) {
      var selectedText = response?.selectedText || "";
      console.log(selectedText, "-----------------------接收到的消息");

      // 在此处调用翻译API，处理翻译结果，并将其显示在popup.html中

      const apiKey = "";
      const inputText = `将 ${selectedText}翻译成中文，只输出结果`;
      return;

      const query = {
        prompt: inputText,
        model: "text-davinci-003",
        temperature: 0.3,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      };

      console.log(query);

      fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(query),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const outputText = data?.choices[0]?.text;

          console.log(outputText, "------------------------outputText");

          const translatedText = document.getElementById("translatedText");

          // handle response here

          translatedText.innerText = outputText;
        })
        .catch((error) => console.error(error));
    });
  });
});
