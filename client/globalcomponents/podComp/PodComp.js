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
        this.backButton = this.shadowRoot.querySelector("#back");
        this.forwardButton = this.shadowRoot.querySelector("#forward")

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

        this.audio.addEventListener("ended", () => {
            if(this.getAttribute("type") == "fas4"){
                song.play()
                song.loop = true;
            }
        })
        
        this.backButton.addEventListener("click", () => this.back())
        this.forwardButton.addEventListener("click", () => this.forward())
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
    back(){
        console.log(this.audio.currentTime);
        if(this.audio.currentTime  > 10){
            console.log("in")
            this.audio.pause();
            this.audio.currentTime = this.audio.currentTime - 10;
            clearInterval(this.timer);
            this.storeState = this.storeState - Math.round(10 / this.interval)
            this.playAudio()
        }
    }
    forward(){
        console.log(this.audio.currentTime);

        if(!this.audio.ended){
            console.log("in")
            this.audio.pause();
            this.audio.currentTime = this.audio.currentTime + 10;
            this.audio.play();
        }
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
                #back, #forward{
                    all: unset;
                }
                #play, #pause{
                    border: 2px solid white;
                    border-radius: 20px;
                    width: 40px;
                    height: 40px;
                    background: transparent;
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
                    <button id="back">
                        <svg width="34" height="37" viewBox="0 0 34 37" fill="none">
                            <path opacity="100" d="M3.50904 16.1157C2.17273 21.1198 3.46742 26.6807 7.3933 30.6066C13.2512 36.4644 22.7487 36.4644 28.6066 30.6066C34.4645 24.7487 34.4645 15.2513 28.6066 9.39338C22.7487 3.53551 17 4.50005 16 4.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M17.9993 7.00004L15.6854 4.51867L17.9996 2.00001" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <text x="10" y="25"  font-size="16px" fill="white">10</text>
                        </svg>
                    </button>
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
                    <button id="forward">
                        <svg width="34" height="37" viewBox="0 0 34 37" fill="none">
                            <path opacity="100" d="M30.491 16.1157C31.8273 21.1198 30.5326 26.6807 26.6067 30.6066C20.7488 36.4644 11.2513 36.4644 5.39341 30.6066C-0.46447 24.7487 -0.46447 15.2513 5.39341 9.39338C11.2513 3.53551 17 4.50005 18 4.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16.0007 7.00004L18.3146 4.51867L16.0004 2.00001" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <text x="10" y="25"  font-size="16px" fill="white">10</text>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }
}

customElements.define("podcast-comp", Podcast);