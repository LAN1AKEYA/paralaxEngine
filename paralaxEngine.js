paralaxConfigurate = [];
let developeModeActivated = false;

class ParalaxElements {

    constructor(element, ratio, mode, alwaysProcessing) {
        if (document.getElementById(element)) {
            this.element = document.getElementById(element);
            if (this.element.closest(`.${this.element.id}-PAPA`)) {
                if (this.element.closest(`.${this.element.id}-PAPA`) != this.element) {

                    this.parent = this.element.closest(`.${this.element.id}-PAPA`);
                    if (ratio) {
                        this.ratio = (ratio) / 100;
                        this.mode = mode ? mode : 'this';
                        this.alwaysProcessing = alwaysProcessing ? alwaysProcessing : false;
                    }
                    else {
                        this.error = `Parameter "ratio" for "${this.element.id}" is not found!`
                    }
                }
                else {
                    this.error = `Element "${this.element.id}" can't have a class "${this.element.id}-PAPA"`
                }
            }
            else {
                this.error = `Parent "${this.element.id}-PAPA" is not found!`
            }
        }
        else {
            this.error = `Element "${element}" is not found!`;
        }
    }

    makeGhost(ghostColor) {
        this.element.style.position = 'relative';
        this.ghostBlock = document.createElement('div');
        this.ghostBlock.id = `${this.element.id}-ghostBlock`;
        this.ghostBlock.style.position = `absolute`;
        this.ghostBlock.style.width = `${this.element.offsetWidth}px`;
        this.ghostBlock.style.height = `${this.element.offsetHeight}px`;
        this.ghostBlock.style.top = `${this.element.offsetTop}px`;
        this.ghostBlock.style.left = `${this.element.offsetLeft}px`;
        this.ghostBlock.style.background = developeModeActivated ? ((ghostColor == '') ? '#ff0000' : ghostColor) : 'none';
        this.ghostBlock.style.opacity = '0.3';
        this.parent.appendChild(this.ghostBlock);
        this.relativePosition = (Math.floor(((this.ghostBlock.offsetTop + (this.ghostBlock.offsetHeight / 2)) - this.parent.offsetTop) / (this.parent.offsetHeight) * 100)) / 100;
    }

}

function paralaxAddElement(element) {
    for (item of element) {
        paralaxConfigurate.push(new ParalaxElements(item.id, item.ratio, item.mode, item.alwaysProcessing));
    }
}

function paralaxRun(ghostColor, consoleOutput) {
    for (item of paralaxConfigurate) {
        if (item.error) {
            console.log(`%cERR: ${item.error}`, 'background-color: red; color: black');
        }
        else {
            item.makeGhost(ghostColor);
        }
    }

    window.addEventListener('resize', () => {
        requestAnimationFrame(function () {
            for (item of paralaxConfigurate) {
                if (!item.error) {
                    item.ghostBlock.style.height = `${item.element.offsetHeight}px`;
                    item.ghostBlock.style.top = `${(item.parent.offsetTop + (item.parent.offsetHeight * item.relativePosition) - (item.ghostBlock.offsetHeight / 2))}px`;
                }
            }
        })
    });

    function updateElementPosition(item) {
        switch (item.mode) {
            case 'this':
                item.element.style.top = `${(((item.ghostBlock.getBoundingClientRect().top - (window.innerHeight / 2) + (item.ghostBlock.offsetHeight / 2)) * Number(item.ratio)) - (item.ghostBlock.getBoundingClientRect().top - (window.innerHeight / 2) + (item.ghostBlock.offsetHeight / 2)))}px`;
                break;
            case 'background':
                item.element.style.backgroundPosition = `center calc(50% + ${(((item.ghostBlock.getBoundingClientRect().top - (window.innerHeight / 2) + (item.ghostBlock.offsetHeight / 2)) * item.ratio) - (item.ghostBlock.getBoundingClientRect().top - (window.innerHeight / 2) + (item.ghostBlock.offsetHeight / 2)))}px)`;
                break;
        }
    }

    for (item of paralaxConfigurate) {
        if (!item.error) {
            updateElementPosition(item);
        }
    }

    document.addEventListener('scroll', () => {
        requestAnimationFrame(function () {
            for (item of paralaxConfigurate) {
                if (!item.error) {
                    if (((item.ghostBlock.getBoundingClientRect().top + item.ghostBlock.offsetHeight >= 0) && (item.ghostBlock.getBoundingClientRect().top < window.innerHeight)) || item.alwaysProcessing) {
                        if (developeModeActivated && consoleOutput) {
                            console.log(`focus on ${item.element.id}`);
                        }
                        updateElementPosition(item);
                    }
                }
            }
        })
    })
}

function developeMode(depth, lineColor, ghostColor) {

    developeModeActivated = true;

    function displayLine(rotate, depth, lineColor) {
        let item = document.createElement('div');
        item.style.position = 'fixed';
        item.style.width = '100%';
        item.style.height = `${depth ? depth : 4}px`;
        item.style.background = lineColor ? lineColor : 'none';
        item.style.backdropFilter = 'invert(100%)';
        item.style.top = `${(window.innerHeight / 2) - ((depth ? depth : 4) / 2)}px`;
        item.style.transform = `rotate(${rotate}deg)`;
        document.body.appendChild(item);
    }

    displayLine(0, depth, lineColor);
    displayLine(90, depth, lineColor);

}

const currentSrc = document.currentScript.src;

fetch(new URL('paralaxConfig.json', currentSrc))
.then(response => {
    return response.json();
})
.then((config) => {
    if (config.run) {

        if (config.developeMode.run) {
            developeMode(config.developeMode.lineWidth, config.developeMode.lineColor, config.developeMode.ghostColor);
        }
        paralaxAddElement(config.elements);
    }
        


    paralaxRun(config.developeMode.ghostColor, config.developeMode.consoleOutput);


})



