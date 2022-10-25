import React from "react";
import { saveAs } from "file-saver";
export default function Main() {
  const [[urlImage, alt], setOtherImage] = React.useState([
    "https://i.imgflip.com/30b1gx.jpg",
    "Drake Hotline Bling",
  ]);

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setData(data.data.memes);
    }
    getMemes();
  }, []);
  const [textObj, setText] = React.useState({
    top: "",
    bottom: "",
    color: "#rrggbb",
  });
  function GenerateImage() {
    let img = document.getElementById("randomImg");
    let x = data[Math.floor(Math.random() * data.length)];
    img.style = `width:${x.width};height:${x.height}px;`;
    setOtherImage([x.url, x.name]);
  }

  function changeTxt(e) {
    const { name, value } = e.target;
    setText((preData) => ({
      ...preData,
      [name]: value,
    }));
  }
  function download() {
    saveAs(urlImage, `${alt}.jpg`);
  }
  return (
    <main>
      <form>
        <div className="input--con">
          <input
            type="text"
            required
            onInput={changeTxt}
            name="top"
            value={textObj.top}
          ></input>
          <span>Top Text</span>
        </div>
        <div className="input--con">
          <input
            type="text"
            required
            onInput={changeTxt}
            name="bottom"
            value={textObj.bottom}
          ></input>
          <span>Bottom Text</span>
        </div>
      </form>
      <div id="color">
        <label style={{ fontSize: "20px" }}>text color : </label>
        <input
          type="color"
          onInput={changeTxt}
          name="color"
          value={textObj.color}
        ></input>
      </div>
      <button className="meme--btn" onClick={GenerateImage}>
        Get a new meme image
      </button>
      <button className="meme--btn" onClick={download}>
        Download image
      </button>
      <div className="img--con">
        <p id="upperText" style={{ color: textObj.color }}>
          {textObj.top}
        </p>
        <img src={urlImage} alt={alt} id="randomImg" />
        <p id="bottomText" style={{ color: textObj.color }}>
          {textObj.bottom}
        </p>
      </div>
    </main>
  );
}
