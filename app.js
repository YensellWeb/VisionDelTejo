(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
     /* ===================== CONTACT FORM (EmailJS) ===================== */
    /* 1. Create a free account at https://www.emailjs.com
       2. Add an Email Service (e.g. Gmail) and copy its SERVICE ID.
       3. Create an Email Template with fields: from_name, from_email, subject, message
          (these match the "name" attributes on the form inputs) and copy its TEMPLATE ID.
       4. Go to Account > General and copy your PUBLIC KEY.
       5. Replace the three placeholders below with your real IDs/key. */

    const EMAILJS_PUBLIC_KEY = "xOg7-YRWG7BFyxPRG";
    const EMAILJS_SERVICE_ID = "service_e8c2kbb";
    const EMAILJS_TEMPLATE_ID = "template_r5z8i0e";

    if (window.emailjs) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const statusEl = document.getElementById("contactFormStatus");
            const submitBtn = document.getElementById("contactSubmitBtn");

            if (!window.emailjs || EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
                statusEl.style.color = "#e74c3c";
                statusEl.textContent = "Contact form is not configured yet. Add your EmailJS keys in app.js.";
                return;
            }

            submitBtn.disabled = true;
            statusEl.style.color = "";
            statusEl.textContent = "Sending...";

            emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
                .then(function () {
                    statusEl.style.color = "#21d07a";
                    statusEl.textContent = "Message sent! I'll get back to you soon.";
                    contactForm.reset();
                    submitBtn.disabled = false;
                })
                .catch(function (error) {
                    statusEl.style.color = "#e74c3c";
                    statusEl.textContent = "Something went wrong. Please try again.";
                    submitBtn.disabled = false;
                    console.error("EmailJS error:", error);
                });
        });
    }
/* ===================== VIDEO MODAL ===================== */
    /* Add a data-video="..." attribute to any .blog card to make it open
       a video player when clicked. Works with:
       - YouTube links:  https://www.youtube.com/watch?v=XXXXXXXXXXX
       - YouTube short:  https://youtu.be/XXXXXXXXXXX
       - Vimeo links:    https://vimeo.com/XXXXXXXXX
       - Local files:    img/videos/my-video.mp4 (or any .mp4/.webm/.mov path) */

    const videoModal = document.getElementById("videoModal");
    const videoModalContent = document.getElementById("videoModalContent");
    const videoModalClose = document.getElementById("videoModalClose");

    function buildEmbedUrl(rawUrl) {
        if (rawUrl.includes("youtube.com/watch")) {
            const videoId = rawUrl.split("v=")[1].split("&")[0];
            return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        }
        if (rawUrl.includes("youtu.be/")) {
            const videoId = rawUrl.split("youtu.be/")[1].split("?")[0];
            return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        }
        if (rawUrl.includes("vimeo.com/")) {
            const videoId = rawUrl.split("vimeo.com/")[1].split("?")[0];
            return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
        }
        return null;
    }

    function openVideoModal(src) {
        if (!videoModal || !videoModalContent) return;
        const embedUrl = buildEmbedUrl(src);

        if (embedUrl) {
            videoModalContent.innerHTML = `<iframe src="${embedUrl}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        } else {
            videoModalContent.innerHTML = `<video src="${src}" controls autoplay playsinline></video>`;
        }
        videoModal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeVideoModal() {
        if (!videoModal || !videoModalContent) return;
        videoModal.classList.remove("active");
        videoModalContent.innerHTML = "";
        document.body.style.overflow = "";
    }

    document.querySelectorAll(".blog[data-video]").forEach(card => {
        card.addEventListener("click", () => {
            const src = card.dataset.video;
            if (src) openVideoModal(src);
        });
    });

    if (videoModalClose) {
        videoModalClose.addEventListener("click", closeVideoModal);
    }
    if (videoModal) {
        videoModal.addEventListener("click", (e) => {
            if (e.target === videoModal) closeVideoModal();
        });
    }
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeVideoModal();
    });
})();
