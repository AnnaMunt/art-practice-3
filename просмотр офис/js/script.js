document.addEventListener('DOMContentLoaded', function() {
    const overlayImg = document.querySelector('.overlay');
    let clickCount = 0;

    overlayImg.addEventListener('click', function() {
        clickCount++;
        
        if (clickCount === 1) {
            overlayImg.src = 'images/noyt2.svg';
        } else if (clickCount === 2) {
            overlayImg.src = 'images/noyt3.svg';
            overlayImg.classList.add('shake');
            setTimeout(() => {
                overlayImg.classList.remove('shake');
            }, 250);
        }
    });

    const dayNight = document.getElementById('dayNight');
    const sleepState = document.getElementById('sleepState');
    const sleepContainer = document.querySelector('.container-sleep');
    const domiki = document.querySelector('.section-2 .first');

    function updatePositions() {
        const domikiHeight = domiki.offsetHeight;
        const sleepHeight = sleepContainer.offsetHeight;
        const vw = window.innerWidth / 100;
        const initialTop = -11 * vw;
        const maxY = domikiHeight - sleepHeight;

        if (dayNight.src.includes('noch.svg')) {
            const targetY = maxY - initialTop;
            sleepContainer.classList.add('night');
            sleepContainer.style.transform = `translate(calc(-100vw + ${sleepHeight}px), ${targetY}px)`;
        } else {
            sleepContainer.classList.remove('night');
            sleepContainer.style.transform = `translate(0, 0)`;
        }
    }

    dayNight.addEventListener('click', function() {
        if (dayNight.src.includes('den.svg')) {
            dayNight.src = 'images/noch.svg';
            sleepState.src = 'images/spit.svg';
            setTimeout(() => {
                updatePositions();
            }, 100);
        } else {
            dayNight.src = 'images/den.svg';
            sleepState.src = 'images/nespit.svg';
            setTimeout(() => {
                updatePositions();
            }, 100);
        }
    });

    window.addEventListener('resize', updatePositions);
    updatePositions();

    const daImg = document.querySelector('.da');
    const netImg = document.querySelector('.net');
    const tablichka = document.querySelector('.tablichka');

    function teleportDa() {
        const tablichkaRect = tablichka.getBoundingClientRect();
        const daRect = daImg.getBoundingClientRect();

        const paddingPercent = 10;
        const minLeftPercent = ((daRect.width / tablichkaRect.width) * 100) + paddingPercent;
        const maxLeftPercent = 100 - minLeftPercent;
        const minTopPercent = ((daRect.height / tablichkaRect.height) * 100) + paddingPercent;
        const maxTopPercent = 100 - minTopPercent;

        const leftRange = maxLeftPercent - minLeftPercent;
        const topRange = maxTopPercent - minTopPercent;
        if (leftRange <= 0 || topRange <= 0) return;

        const newLeftPercent = minLeftPercent + Math.random() * leftRange;
        const newTopPercent = minTopPercent + Math.random() * topRange;

        daImg.style.left = `${newLeftPercent}%`;
        daImg.style.top = `${newTopPercent}%`;
    }

    daImg.addEventListener('mouseenter', teleportDa);

    netImg.addEventListener('click', function() {
        netImg.src = 'images/net2.svg';
        tablichka.src = 'images/tablichka3.svg';
    });

    const glazl = document.querySelector('.glazl');
    const glazp = document.querySelector('.glazp');
    const zrachokl = document.querySelector('.zrachokl');
    const zrachokp = document.querySelector('.zrachokp');

    function movePupils(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const glazlRect = glazl.getBoundingClientRect();
        const glazpRect = glazp.getBoundingClientRect();
        const zrachoklRect = zrachokl.getBoundingClientRect();
        const zrachokpRect = zrachokp.getBoundingClientRect();

        const glazlCenterX = glazlRect.left + glazlRect.width / 2;
        const glazlCenterY = glazlRect.top + glazlRect.height / 2;
        const glazpCenterX = glazpRect.left + glazpRect.width / 2;
        const glazpCenterY = glazpRect.top + glazpRect.height / 2;

        const maxOffsetX = (glazlRect.width - zrachoklRect.width) / 2 * 0.8;
        const maxOffsetY = (glazlRect.height - zrachoklRect.height) / 2 * 0.8;

        const dxL = mouseX - glazlCenterX;
        const dyL = mouseY - glazlCenterY;
        const dxP = mouseX - glazpCenterX;
        const dyP = mouseY - glazpCenterY;

        const angleL = Math.atan2(dyL, dxL);
        const angleP = Math.atan2(dyP, dxP);

        const distanceL = Math.min(Math.sqrt(dxL * dxL + dyL * dyL), maxOffsetX);
        const distanceP = Math.min(Math.sqrt(dxP * dxP + dyP * dyP), maxOffsetX);

        let zrachoklX = glazlCenterX + Math.cos(angleL) * Math.min(distanceL, maxOffsetX) - zrachoklRect.width / 2;
        let zrachoklY = glazlCenterY + Math.sin(angleL) * Math.min(distanceL, maxOffsetY) - zrachoklRect.height / 2;
        let zrachokpX = glazpCenterX + Math.cos(angleP) * Math.min(distanceP, maxOffsetX) - zrachokpRect.width / 2;
        let zrachokpY = glazpCenterY + Math.sin(angleP) * Math.min(distanceP, maxOffsetY) - zrachokpRect.height / 2;

        const zrachoklMinX = glazlRect.left;
        const zrachoklMaxX = glazlRect.right - zrachoklRect.width;
        const zrachoklMinY = glazlRect.top;
        const zrachoklMaxY = glazlRect.bottom - zrachoklRect.height;

        const zrachokpMinX = glazpRect.left;
        const zrachokpMaxX = glazpRect.right - zrachokpRect.width;
        const zrachokpMinY = glazpRect.top;
        const zrachokpMaxY = glazpRect.bottom - zrachokpRect.height;

        zrachoklX = Math.max(zrachoklMinX, Math.min(zrachoklMaxX, zrachoklX));
        zrachoklY = Math.max(zrachoklMinY, Math.min(zrachoklMaxY, zrachoklY));
        zrachokpX = Math.max(zrachokpMinX, Math.min(zrachokpMaxX, zrachokpX));
        zrachokpY = Math.max(zrachokpMinY, Math.min(zrachokpMaxY, zrachokpY));

        zrachokl.style.left = `${zrachoklX}px`;
        zrachokl.style.top = `${zrachoklY}px`;
        zrachokp.style.left = `${zrachokpX}px`;
        zrachokp.style.top = `${zrachokpY}px`;
    }

    function centerPupils() {
        const glazlRect = glazl.getBoundingClientRect();
        const glazpRect = glazp.getBoundingClientRect();
        const zrachoklRect = zrachokl.getBoundingClientRect();
        const zrachokpRect = zrachokp.getBoundingClientRect();

        const zrachoklX = glazlRect.left + (glazlRect.width - zrachoklRect.width) / 2;
        const zrachoklY = glazlRect.top + (glazlRect.height - zrachoklRect.height) / 2;
        const zrachokpX = glazpRect.left + (glazpRect.width - zrachokpRect.width) / 2;
        const zrachokpY = glazpRect.top + (glazpRect.height - zrachokpRect.height) / 2;

        zrachokl.style.left = `${zrachoklX}px`;
        zrachokl.style.top = `${zrachoklY}px`;
        zrachokp.style.left = `${zrachokpX}px`;
        zrachokp.style.top = `${zrachokpY}px`;
    }

    centerPupils();
    document.addEventListener('mousemove', movePupils);
    window.addEventListener('resize', centerPupils);
});