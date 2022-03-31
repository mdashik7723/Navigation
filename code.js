const SLIDER_INFOS = [
    {
        img: {
            link:
                "https://assets.codepen.io/t-1/lefteris-kallergis-_TLKIVSW6Do-unsplash.jpg",
            alt: "a vegetarian burger with a quinoa patty and lots of vegetable fixins."
        },
        texts: [
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!",
            "Ad dolore dignissimos asperiores dicta facere optio quod commodi nam tempore recusandae. Rerum sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio aliquam!"
        ]
    },
    {
        img: {
            link: "https://assets.codepen.io/t-1/jay-gajjar-vsYCZVef28E.jpg",
            alt:
                "french fries seasoned with garlic and spices in a brown craft paper container."
        },
        texts: [
            "Tenetur quod quidem in voluptatem corporis dolorum dicta sit pariatur porro quaerat autem ipsam odit quam beatae tempora quibusdam illum! Modi velit odio nam nulla unde amet odit pariatur at!"
        ]
    },
    {
        img: {
            link:
                "https://assets.codepen.io/t-1/melissa-walker-horn-NkwNp3ho-Qw-unsplash.jpg",
            alt: "a burger, fries, and a beer on a restaurant table."
        },
        texts: [
            "Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus necessitatibus reiciendis optio tempora unde earum doloremque commodi laudantium ad nulla vel odio?"
        ]
    }
];

const $loader = document.querySelector("#loader");

const expand = (e, target) => {
    const $self = e.target;
    const $target = document.querySelector(`#${target}`);
    const isExpanded = $target.dataset.expanded;
    if (isExpanded === "true") {
        $target.setAttribute("data-expanded", "false");
        $target.classList.remove("expanded");
        $target.style.height = "0px";
        $self.classList.remove("expanded");
    } else {
        $target.setAttribute("data-expanded", "true");
        $target.classList.add("expanded");
        $target.style.height = `${$target.dataset.height}px`;
        $self.classList.add("expanded");
    }
};

class YImage {
    constructor(imageTarget, textTarget) {
        this.currentIndex = 0;
        this.imageInformations = "";
        this.textTarget = document.querySelector(textTarget);
        this.imgTarget = document.querySelector(imageTarget);
    }

    loadImageUrl() {
        this.currentIndex =
            this.currentIndex === SLIDER_INFOS.length - 1 ? 0 : this.currentIndex + 1;
        this.imageInformations = SLIDER_INFOS[this.currentIndex];
        this.updateImage();
    }

    updateImage() {
        this.imgTarget.src = this.imageInformations.img.link;
        this.imgTarget.alt = this.imageInformations.img.alt;
        this.imgTarget.onload = (e) => {
            this.updateInformations();
            this.imgTarget.classList.add("active");
            $loader.classList.add("hidden");
        };
    }

    updateInformations() {
        const ps = this.imageInformations.texts;
        ps.forEach((p) => {
            this.textTarget.appendChild(this.createParagraph(p));
        });
    }

    createParagraph(text) {
        const p = document.createElement("p");
        p.innerText = text;
        return p;
    }

    removeImage() {
        this.textTarget.innerHTML = "";
        this.imgTarget.classList.remove("active");
        $loader.classList.remove("hidden");
    }
}

const initApp = () => {
    Array.from(document.querySelectorAll(".expandable")).forEach((e) => {
        e.setAttribute("data-height", e.offsetHeight);
        e.style.height = "0px";
    });
    document.querySelector("nav").classList.add("ready");

    setTimeout(() => {
        initSlider();
    }, 300);
};

initApp();

const initSlider = () => {
    const imageMain = new YImage("#mainImage", "#mainImage_infos");
    imageMain.loadImageUrl();

    setInterval(() => {
        imageMain.removeImage();
        setTimeout(() => {
            imageMain.loadImageUrl();
        }, 1000);
    }, 4000);
};
