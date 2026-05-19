class VideoComp extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
        this.playMusic();
    }

    playMusic() {
        let videoDOM = this.shadowRoot.querySelector("#videoMax")
        let song = new Audio("./globalcomponents/audios/Running_Up_That_Hill.mp3");

        videoDOM.addEventListener("play", () => {
            song.play()
        })
        videoDOM.addEventListener("pause", () => {
            song.pause()
        })
        
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                video{
                    transform: rotate(90deg);
                    height: 393px;
                    margin-left: -153px;
                    margin-top: 150px;
                    position: absolute;
                }
            </style>            
            <video id="videoMax" controls>
                <source src="./views/lastVideo/components/StrangerThingsJohanv4.mp4" type="video/mp4"/>
            </video>
        `;
    }


}

customElements.define("video-comp", VideoComp)