import "./Loading.css"
function Loading({width,height}) {
  return (
    <div className="flex spinner-box" style={{height:`${height}`,width:`${width}`}}>
      <div className="flex circle-border"  >
        <div className="w-100 h-100 circle-inner"></div>
      </div>
    </div>
  );
}
export {Loading}
