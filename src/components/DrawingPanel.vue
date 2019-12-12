<template>
    <div id="drawingPanelMain">
        <div>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <p id="welcomeMessage">
                    {{message}}
                </p>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div id="mainButtonPanel" v-if="drawMode === false" class="buttonPanel">
                <button @click="activateDrawing" class="customButton">New</button>
                <button @click="loadGallery" class="customButton">Gallery</button>
            </div>
            <div id="drawButtonPanel" v-if="drawMode" class="buttonPanel">
                <button @click="cancel" class="customButton">&#11152; Return</button>
                <a @click="save(this)" class="customButton" id="downloadButton" download="myimage.jpg" href="">&#11123; Save</a>
            </div>
        </div>
        <div id="drawPanel" v-if="drawMode">
            <canvas id="canvas" v-draw-focus></canvas>
            <div class="toolPanel">
                <button class="customButton" id="pencilButton">
                    &#128394; Pencil
                </button>
                <button class="customButton" id="eraserButton">
                    &#9003; Eraser
                </button>
                <input type="color" class="customButton" id="colorButton">
                <button class="customButton" id="resetButton">
                    &#10226; Reset
                </button>
            </div>
        </div>
    </div>
</template>

<script>


    export default {
        name: "drawing-panel",
        data() {
            return {
                message: "This panel is for creating new drawings",
                drawMode: false,
            }
        },
        methods: {
            activateDrawing(){
                this.drawModeSwitch();
            },
            loadGallery() {
                if(this.drawMode === true){
                    this.drawModeSwitch();
                    //Load objects
                }
            },
            cancel() {
                //document.getElementById("app").scrollIntoView();
                //window.setTimeout(this.drawModeSwitch,500);
                this.drawModeSwitch();
            },
            drawModeSwitch(){
                this.drawMode = !this.drawMode;
            },
            save(){
                var canvas = document.getElementById("canvas");
                var image = canvas.toDataURL("image/jpg");
                document.getElementById("downloadButton").setAttribute("href",image);
            },


        },
        directives: {
            drawFocus: {
                inserted: function () {
                    const canvas = document.getElementById("canvas");

                    //This method has been put out of use; scrolling causes the coordinates of the canvas to distort.
                    //canvas.scrollIntoView();

                    //Setting the width and height attributes of the canvas through setAttribute()-method is so far the only way to ensure the strokes will not be blurry, and the canvas will be sized properly.
                    canvas.setAttribute("width","900%");
                    canvas.setAttribute("height","280%");

                    // When true, moving the mouse draws on the canvas
                    let isDrawing = false;
                    let x = 0;
                    let y = 0;
                    var erasing = false;

                    const context = canvas.getContext('2d');
                    var resetButton = document.getElementById("resetButton");
                    resetButton.addEventListener("click",function () {
                        context.clearRect(0,0,canvas.width,canvas.height);
                    });
                    context.strokeStyle = "black";

                    // The x and y offset of the canvas from the edge of the page
                    const rect = canvas.getBoundingClientRect();

                    // Add the event listeners for mousedown, mousemove, and mouseup
                    canvas.addEventListener('mousedown', e => {
                        x = e.clientX - rect.left;
                        y = e.clientY - rect.top;
                        isDrawing = true;
                    });

                    canvas.addEventListener('mousemove', e => {
                        if (isDrawing === true) {
                            drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
                            x = e.clientX - rect.left;
                            y = e.clientY - rect.top;
                        }
                    });

                    window.addEventListener('mouseup', e => {
                        if (isDrawing === true) {
                            drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
                            x = 0;
                            y = 0;
                            isDrawing = false;
                        }
                    });

                    document.getElementById("eraserButton").addEventListener("click",function () {
                        erasing = true;
                    });

                    document.getElementById("pencilButton").addEventListener("click",function(){
                       erasing = false;
                    });


                    var colorButton = document.getElementById("colorButton");

                    function drawLine(context, x1, y1, x2, y2) {
                        if (erasing){
                            context.strokeStyle = "white";
                            context.lineWidth = 20;
                        } else{
                            context.strokeStyle = colorButton.value;
                            context.lineWidth = 3;
                        }
                        context.beginPath();
                        context.moveTo(x1, y1);
                        context.lineTo(x2, y2);
                        context.stroke();
                        context.closePath();
                    }


                }
            }
        }
        }
</script>

<style scoped>

    #main{
        text-align:center;
    }

    #canvas{
        border:2px solid black;
        margin: 1rem;
    }

    .buttonPanel{
        border: 2px solid slategrey;
        text-align: center;
    }

    .toolPanel{
        border: 2px solid slategrey;
        display: block;
    }
    #drawPanel{
        width: content-box;
    }

</style>