import { reject } from "lodash";
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

document.addEventListener("mouseup", async function (event) {
  try {
    let selectedText = (window.getSelection()?.toString() ?? "").trim();

    const x = event.pageX + 7;
    const y = event.pageY + 7;

    if (!selectedText) {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        const elem = event.target;
        selectedText = elem.value.substring(elem.selectionStart ?? 0, elem.selectionEnd ?? 0);
      }
    }

    console.log(selectedText, Boolean(selectedText));

    if (!Boolean(selectedText)) {
      console.log("退出啦");
      return;
    }

    let container;
    container = await getContainer();

    console.log("container", container);

    let Ladybug_Icon_Container = container.querySelector(`#Ladybug_Icon_Container_Container`);

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
      Ladybug_Icon_Container.style.width = "20px";
      Ladybug_Icon_Container.style.height = "20px";
      Ladybug_Icon_Container.style.overflow = "hidden";
      // Ladybug_Icon_Container.addEventListener("click", popupThumbClickHandler);
      Ladybug_Icon_Container.addEventListener("mousemove", (event) => {
        event.stopPropagation();
      });
      Ladybug_Icon_Container.addEventListener("mousedown", (event) => {
        event.stopPropagation();
      });
      Ladybug_Icon_Container.addEventListener("mouseup", (event) => {
        event.stopPropagation();
      });
      const iconImg = document.createElement("img");
      iconImg.src = ladybugIcon;
      iconImg.style.display = "block";
      iconImg.style.width = "100%";
      iconImg.style.height = "100%";
      Ladybug_Icon_Container.appendChild(iconImg);
      const container = await getContainer();
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
});


async function removeContainer() {
  const container = await getContainer()
  $container.remove()
}

async function hidePopupThumb() {
  const popupThumb = await queryPopupThumbElement()
  let Ladybug_Icon_Container = container.querySelector(`#Ladybug_Icon_Container_Container`);
  if (!popupThumb) {
      return
  }
  removeContainer()
}

document.addEventListener('mousedown', () => {
 
  hidePopupThumb()
})
