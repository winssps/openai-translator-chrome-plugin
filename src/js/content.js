import React from "react";
import { createRoot } from "react-dom/client";
import browser from "webextension-polyfill";
import { fetchOpenApi } from "../http";
import ladybugIcon from "../../public/ladybug.png";

const getContainer = async () => {
  try {
    let container = document.querySelector("containerTagName");
    if (!container) {
      container = document.createElement("containerTagName");
      container.style.zIndex = "99999";
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const container_ = document.querySelector("containerTagName");
          if (container_) {
            resolve(container_);
            return;
          }
          const html = document.body.parentElement;
          if (html) {
            html.appendChild(container);
          } else {
            document.appendChild(container);
          }
          resolve(container);
        }, 100);
      });
    }
    return new Promise((resolve) => {
      resolve(container);
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

document.addEventListener("mouseup", function (event) {
  setTimeout(async () => {
    try {
      const x = event.pageX + 7;
      const y = event.pageY + 7;
      let selectedText = (window.getSelection()?.toString() ?? "").trim();

      if (!selectedText) {
        if (
          event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLTextAreaElement
        ) {
          const elem = event.target;
          selectedText = elem.value.substring(
            elem.selectionStart ?? 0,
            elem.selectionEnd ?? 0
          );
        }
      }

      if (!Boolean(selectedText)) {
        return;
      }

      let container = await getContainer();

      // 小图标
      let Ladybug_Icon_Container = container.querySelector(
        `#Ladybug_Icon_Container`
      );

      if (!Ladybug_Icon_Container) {
        Ladybug_Icon_Container = document.createElement("div");
        Ladybug_Icon_Container.id = "Ladybug_Icon_Container";
        Ladybug_Icon_Container.style.position = "absolute";
        Ladybug_Icon_Container.style.zIndex = "99999";
        Ladybug_Icon_Container.style.background = "#fff";
        Ladybug_Icon_Container.style.padding = "2px";
        Ladybug_Icon_Container.style.borderRadius = "4px";
        Ladybug_Icon_Container.style.boxShadow = "0 0 4px rgba(0,0,0,.2)";
        Ladybug_Icon_Container.style.cursor = "pointer";
        Ladybug_Icon_Container.style.userSelect = "none";
        Ladybug_Icon_Container.style.width = "36px";
        Ladybug_Icon_Container.style.height = "36px";
        Ladybug_Icon_Container.style.overflow = "hidden";

        Ladybug_Icon_Container.addEventListener("mousemove", (event) => {
          event.stopPropagation();
        });
        Ladybug_Icon_Container.addEventListener("mousedown", (event) => {
          event.stopPropagation();
        });
        Ladybug_Icon_Container.addEventListener("mouseup", (event) => {
          event.stopPropagation();
        });
        Ladybug_Icon_Container.addEventListener("click", () =>
          showTranslationPanel(event, selectedText)
        );
        const iconImg = document.createElement("img");
        iconImg.src = ladybugIcon;
        iconImg.style.display = "block";
        iconImg.style.width = "100%";
        iconImg.style.height = "100%";
        Ladybug_Icon_Container.appendChild(iconImg);
        container.appendChild(Ladybug_Icon_Container);
      }

      Ladybug_Icon_Container.dataset["text"] = selectedText;
      Ladybug_Icon_Container.style.display = "block";
      Ladybug_Icon_Container.style.opacity = "100";
      Ladybug_Icon_Container.style.left = `${x}px`;
      Ladybug_Icon_Container.style.top = `${y}px`;
    } catch (error) {
      console.log(error);
    }
  }, 0);
});

document.addEventListener("mousedown", async () => {
  const container = await getContainer();

  let Ladybug_Icon_Container = container.querySelector(
    `#Ladybug_Icon_Container`
  );
  if (!Ladybug_Icon_Container) {
    return;
  }

  container.remove();
});

const showTranslationPanel = async (event, text) => {
  try {
    // 图标loading
    const result = await browser.storage.sync.get("apiKey");
    const res = await fetchOpenApi(result?.apiKey, {
      model: "text-davinci-003",
      prompt: `Translate this into Chinese : ${text}.`,
      temperature: 0.3,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    const data = await res.json();
    const translationText = data?.choices[0]?.text;

    const container = await getContainer();
    let Translation_Container = container.querySelector(
      `#Translation_Container`
    );

    const x = event.pageX + 7;
    const y = event.pageY + 7;

    // 翻译面板
    if (!Translation_Container) {
      Translation_Container = document.createElement("div");
      Translation_Container.id = "Translation_Container";
      Translation_Container.style.position = "absolute";
      Translation_Container.style.zIndex = "99999";
      Translation_Container.style.background = "#fff";
      Translation_Container.style.padding = "2px";
      Translation_Container.style.borderRadius = "4px";
      Translation_Container.style.boxShadow = "0 0 4px rgba(0,0,0,.2)";
      Translation_Container.style.cursor = "pointer";
      Translation_Container.style.userSelect = "none";
      Translation_Container.style.width = "240px";
      Translation_Container.style.height = "136px";
      Translation_Container.style.overflow = "hidden";
      container.appendChild(Translation_Container);
    }

    Translation_Container.style.display = "block";
    Translation_Container.style.opacity = "100";
    Translation_Container.style.left = `${x + 48}px`;
    Translation_Container.style.top = `${y}px`;

    root = createRoot(Translation_Container);
    root.render(<TranslationContainer data={{ text, translationText }} />);
  } catch (error) {
    console.log(error);
  }
};

const TranslationContainer = ({ data }) => {
  const { text, translationText } = data;
  return (
    <div>
      <div>{text}</div>
      <div>{translationText}</div>
    </div>
  );
};
