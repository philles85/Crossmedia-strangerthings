class Podcast extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render()
        this.handler()
    }
    
    subs() {

    }
    handler(){
        this.playing = false;
        this.audio = null;
        this.interval = null;
        this.rSelecetion = null;
        this.timer = null;
        this.storeState = 0;
        this.audioButton = this.shadowRoot.querySelector("#play");

        this.setAudio()
        this.d3_logic()
        this.eventListerners()
        this.reset()
    }

    d3_logic() {
        const hSvg = 70, wSvg = 350;
        const svg = d3.select(this.shadowRoot)
                    .select("svg")
                    .attr("height", hSvg)
                    .attr("width", wSvg);

        let rectArray = [];
        for (let i = 0; i < 50; i++) {
            let randomHeight = Math.floor(70 * Math.random())
            rectArray.push({id: i, height: randomHeight})
        } 

        let xScale = d3.scaleBand(rectArray, [0, wSvg])
            .paddingInner(.8)
            .paddingOuter(.9);
        
        this.rSelection = svg.append("g")
            .selectAll("rect")
            .data(rectArray)
            .enter()
            .append("rect")
            .attr("height", d => d.height)
            .attr("width", xScale.bandwidth())
            .attr("x", d => xScale(d))
            .attr("y", d => (hSvg - d.height) / 2)
            .attr("fill", "darkgrey")
                
        
        // let song = new Audio("./globalcomponents/audios/Running_Up_That_Hill.mp3");
        
        // let played = false;
        // if(this.getAttribute("type") == "fas4"){
        //     console.log(1)
        //     audio.addEventListener("ended", () => {
        //         if(playing == false){
        //             console.log("hej")
        //             song.play()
        //         }
        //         else{
        //             song.pause
        //         }
        
        //     })
        // }

    }
    setAudio(){
        if(this.getAttribute("type") == "fas1") {
            this.audio = new Audio("./globalcomponents/audios/intro.mp3");
            this.interval = 2280;
            // audio.pause;
            // audio.currentTime = 0;

        } else if (this.getAttribute("type") == "fas4"){
            this.audio = new Audio("./globalcomponents/audios/Eleven-podd-fas4.mp3");
            this.interval = 1520;
        } 
    }

    eventListerners(){
        let song = new Audio("./globalcomponents/audios/Running_Up_That_Hill.mp3");
        
        this.audioButton.addEventListener("click", () => {

            if (this.playing == false){
                this.playAudio();
                song.pause()
            } else if (this.playing == true){
                this.pauseAudio()
            }
        })

        this.audio.addEventListener("ended", (event) => {
            if(this.getAttribute("type") == "fas4"){
                song.play()
                song.loop = true;
            }
        })
    }
    
    playAudio(){
        let allRects = this.rSelection.nodes()
        this.audio.play();
        this.audioButton.removeAttribute("id", "play");
        this.audioButton.setAttribute("id", "pause");
        this.audioButton.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M0 18V0H6V18H0Z" fill="white"/>
                <path d="M18 0H12V18H18V0Z" fill="white"/>
            </svg>
        `;

        this.timer = setInterval(() => {
            if (this.storeState >= allRects.length){
                clearInterval(this.timer);
                return;
            }
            let node = allRects[this.storeState];
            d3.select(node).attr("fill", "white");
            this.storeState++;
        }, this.interval);
        this.playing = true;
    }

    pauseAudio(){
        this.audio.pause();
        this.audioButton.removeAttribute("id", "pause");
        this.audioButton.setAttribute("id", "play");
        this.audioButton.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M0 18L18 9.29032L0 0V18Z" fill="white"/>                    
            </svg>
        `;
        clearInterval(this.timer);
        this.playing = false;
    }

    reset(){
        let restartButton = this.shadowRoot.querySelector("#restart");
        restartButton.addEventListener("click", () => window.location.reload());
    }

    

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                #podcast{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin: 70px 20px;
                    gap: 20px;
                }
                #play, #pause{
                    width: 40px;
                    height: 40px;
                    background: transparent;
                    border: 2px solid white;
                    border-radius: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                #play{
                    padding: 7px 7px 7px 10px;
                }
                #buttons{
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                #restart{
                    display: flex;
                }
            </style>
            <div id="podcast">
                <svg id="soundWaves"></svg>
                <div id="buttons">
                    <button id="play">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M0 18L18 9.29032L0 0V18Z" fill="white"/>                    
                        </svg>
                    </button>
                    <div id="restart">
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
                            <path opacity="100" d="M32.457 12.8567C33.8824 18.1945 32.5014 24.1261 28.3138 28.3137C22.0654 34.5621 11.9347 34.5621 5.6863 28.3137C-0.562101 22.0653 -0.562101 11.9347 5.6863 5.68629C11.9347 -0.562098 22.0654 -0.562098 28.3138 5.68629L29.728 7.10049" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M28 8.08731H31.7123V4.375" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>    
                    </div> 
                </div>
            </div>
        `;
    }
}

customElements.define("podcast-comp", Podcast);