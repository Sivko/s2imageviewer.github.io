import { useCallback, useEffect, useState } from "react";
import Switch from "react-switch";
import getFiles from "./lib/getFiles";
import Images from "./components/Images";
import ImageViewer from 'react-simple-image-viewer';

function App() {
  const [imagesToggle, setImagesToggle] = useState(true);
  const [watermarkToggle, setWatermarkToggle] = useState(false);
  const [includesObjToggle, setIncludesObjToggle] = useState(false);
  const [otherFilesToggle, setOtherFilesToggle] = useState(false);
  const [time, setTime] = useState(500);

  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  useEffect(() => {
    if (window === undefined) return
    const opt = window.localStorage.getItem('options')
    if (opt) {
      const ls = JSON.parse(opt);
      setImagesToggle(prev => ls.imagesToggle || prev)
      setWatermarkToggle(prev => ls.watermarkToggle || prev)
      setIncludesObjToggle(prev => ls.includesObjToggle || prev)
      setOtherFilesToggle(prev => ls.otherFilesToggle || prev)
      setTime(prev => ls.time || prev)
    }
    async function fetching() {
      const res = await getFiles(imagesToggle, includesObjToggle, otherFilesToggle, time);
      setFiles([...res]);
    }
    fetching();
  }, [])

  useEffect(() => {
    if (!files.length) return
    const imgs = files.filter(e => (e.attributes["content-type"]).includes('image')).map(e => e.attributes["download-link"]);
    setImages(imgs);
  }, [files])

  useEffect(()=> {
    console.log(images);
  },[images])

  useEffect(() => {
    window.localStorage.setItem('options', JSON.stringify({ imagesToggle, watermarkToggle, includesObjToggle, otherFilesToggle, time }))
  }, [imagesToggle, watermarkToggle, includesObjToggle, otherFilesToggle, time])

  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        <div className="options">
          <span>Выводить картинки</span>
          <Switch checkedIcon={false} onColor="#2a98e7" uncheckedIcon={false} onChange={() => setImagesToggle(prev => !prev)} checked={imagesToggle} />
        </div>

        <div className="options">
          <span>Инф. на картинке</span>
          <Switch checkedIcon={false} onColor="#2a98e7" uncheckedIcon={false} onChange={() => setWatermarkToggle(prev => !prev)} checked={watermarkToggle} />
        </div>

        <div className="options">
          <span>Поиск по вл. объектам</span>
          <Switch checkedIcon={false} onColor="#2a98e7" uncheckedIcon={false} onChange={() => setIncludesObjToggle(prev => !prev)} checked={includesObjToggle} />
        </div>

        <div className="options">
          <span>Вывод других файлов</span>
          <Switch checkedIcon={false} onColor="#2a98e7" uncheckedIcon={false} onChange={() => setOtherFilesToggle(prev => !prev)} checked={otherFilesToggle} />
        </div>

        <div className="options">
          <span>Timeout</span>
          <input onChange={(e) => setTime(e.target.value)} value={time} type="number" style={{ width: '100%', padding: '10px' }} />
        </div>
      </div>
      <div style={{ flexBasis: '100%' }}>
        <div>
          <hr />
          <div className="listItems">
            {images.map((e, index) => (
              <div onClick={() => openImageViewer(index)}><Images key={index} url={e} /></div>)
            )}
            {/* {JSON.stringify(files)} */}
          </div>
        </div>
      </div>
      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </div>
  );
}

export default App;
