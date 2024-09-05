
"use client"

interface IGradientImage {
    imageUrl: string
}
const GradientImage: React.FC<IGradientImage> = ({ imageUrl }) => {
    return (<div className="relative w-full h-72 mb-10 ">
        <div
            className="absolute z-10 inset-0 bg-cover bg-center"
            style={{
                backgroundImage: `url(${imageUrl})`,
            }}
        ></div>
        <div
            style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(to bottom, transparent, white)",
                zIndex: 10,
                position: "absolute",
            }}
        ></div>
    </div>)
}
export default GradientImage