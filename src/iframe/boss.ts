const getWorker = async (): Promise<ServiceWorker | null> => {
  if (!("serviceWorker" in navigator)) {
    console.log(1);
    return null;
  }

  const registrations = await navigator.serviceWorker.getRegistrations();

  if (registrations[0]?.active) {
    return registrations[0].active;
  }

  try {
    const registration = await navigator.serviceWorker.register(
      "/iframe/sw.js",
      {
        scope: "/iframe/",
      },
    );

    if (registration.active && registration.active.state === "activated") {
      return registration.active;
    }

    // 2. Identify the target ServiceWorker instance
    const sw =
      registration.installing || registration.waiting || registration.active;

    if (!sw) {
      throw new Error("No Service Worker found in registration.");
    }

    // 3. Wait for the state to transition to 'activated'
    return new Promise((resolve, reject) => {
      sw.addEventListener("statechange", (event) => {
        if (event?.target?.["state"] === "activated") {
          resolve(event.target as ServiceWorker);
        }
      });
      setTimeout(reject, 1000);
    });
  } catch (error) {
    console.error("ServiceWorker registration failed: ", error);

    return null;
  }
};

const setResourceContent = async (
  name: string,
  content: string,
  contentType?: string,
) => {
  return getWorker().then((worker) => {
    if (!worker) throw new Error("Service worker is not active");

    worker.postMessage({
      type: "resource",
      name,
      content,
      contentType,
    });
  });
};

async function setContent(text: string) {
  let iframe = getIframe();

  let xy: [number, number] | undefined = undefined;
  if (iframe) {
    try {
      const wind = iframe.contentWindow;
      if (wind) xy = [wind.scrollX, wind.scrollY];
    } catch (e) {
      console.error(e);
    }
    iframe.remove();
  }

  iframe = document.createElement("iframe");

  const url = location.origin + "/iframe/" + location.search + location.hash;

  await setResourceContent(url, text, "text/html");

  iframe.src = url;

  document.body.appendChild(iframe);

  iframe.addEventListener("load", () => {
    addIframeHashChangeListener();
    if (xy)
      setTimeout(() => {
        const wind = iframe && iframe.contentWindow;
        xy && wind && wind.scrollTo(...xy);
      }, 10);
  });
}

window.addEventListener(
  "resize",
  (() => {
    const setHeight = () => {
      document.body.style.height = window.innerHeight + "px";
    };
    return (setHeight(), setHeight);
  })(),
);

window.addEventListener("hashchange", function () {
  const iframe = getIframe();
  if (!iframe?.contentWindow) return;
  iframe.contentWindow.location.hash = location.hash;
});

function addIframeHashChangeListener() {
  const iframe = getIframe();
  if (!iframe?.contentWindow) return;
  iframe.contentWindow.addEventListener("hashchange", function () {
    if (!iframe?.contentWindow) return;
    location.hash = iframe.contentWindow.location.hash;
  });
}

function getIframe() {
  return document.querySelector("iframe");
}

const thisModule = {
  setContent,
};

// @ts-ignore
window["notepadIframe"] = thisModule;
