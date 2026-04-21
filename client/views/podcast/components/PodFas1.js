
class PodFas1 extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.subs();
    }

    subs() {

    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
            </style>
            <div id="header">
                <audio controls autoplay>
                    <source src="../podcasts/testSound.mp3" type="audio/mpeg"> 

                </audio>
                
            </div>
        `
    }
}

customElements.define("pod-fas1", PodFas1);