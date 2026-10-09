
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuButton && mobileMenu) {
        menuButton.addEventListener("click", function () {
            mobileMenu.classList.toggle("show");
            const isOpen = mobileMenu.classList.contains("show");

            menuButton.textContent = isOpen ? "✕" : "☰";
            menuButton.setAttribute("aria-expanded", String(isOpen));
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

            if (mobileMenu) mobileMenu.classList.remove("show");

            if (menuButton) {
                menuButton.textContent = "☰";
                menuButton.setAttribute("aria-expanded", "false");
            }
        });
    });

    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    navLinks.forEach(function (link) {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === "#" + entry.target.id
                        );
                    });
                }
            });
        }, {
            rootMargin: "-25% 0px -60% 0px"
        });

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

    const taskForm = document.getElementById("taskForm");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskForm && taskInput && taskList) {
        taskForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const text = taskInput.value.trim();

            if (text === "") return;

            const item = document.createElement("li");
            item.className = "task-item";

            const task = document.createElement("span");
            task.className = "task-text";
            task.textContent = text;

            const complete = document.createElement("button");
            complete.type = "button";
            complete.className = "task-action task-complete";
            complete.textContent = "✓";
            complete.setAttribute("aria-label", "Tandai selesai");

            complete.addEventListener("click", function () {
                task.classList.toggle("task-done");
            });

            const remove = document.createElement("button");
            remove.type = "button";
            remove.className = "task-action task-delete";
            remove.textContent = "✕";
            remove.setAttribute("aria-label", "Hapus tugas");

            remove.addEventListener("click", function () {
                item.remove();
            });

            item.append(task, complete, remove);
            taskList.appendChild(item);

            taskInput.value = "";
            taskInput.focus();
        });
    }
});