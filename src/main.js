let carousel = document.querySelector('.carousel');
let Oicon = document.querySelectorAll('.wrapper i');
var firstImg = carousel.querySelectorAll('img')[0];
let isDrageStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
const dragStart = (e) => {
  isDrageStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft
}
const dragging = (e) => {
  if (!isDrageStart) return
  e.preventDefault()
  isDragging = true;
  carousel.classList.add('dragging')
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff
  showIcon();
}
const dragStop = () => {
  isDrageStart = false;
  carousel.classList.remove('dragging')
  if (!isDragging) return
  isDragging = false
  autoSlide();
}

Oicon.forEach(element => {
  element.addEventListener('click', () => {
    let firstImageWidth = firstImg.clientWidth + 10  //加10因为图片的margin-left为10
    carousel.scrollLeft += element.id == 'left' ? -firstImageWidth : firstImageWidth
    setTimeout(() => showIcon(), 60)
  })
});
// 左右箭头的icon显示隐藏
const showIcon = () => {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth
  Oicon[0].style.display = carousel.scrollLeft == 0 ? 'none' : 'block'
  Oicon[1].style.display = carousel.scrollLeft == scrollWidth ? 'none' : 'block'
}

const autoSlide = () => {
  if (carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return
  positionDiff = Math.abs(positionDiff)
  let firstImgWidth = firstImg.clientWidth + 10
  let valDifference = firstImgWidth - positionDiff
  if (carousel.scrollLeft > prevScrollLeft) {
    return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
  }
  carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}
carousel.addEventListener('mousemove', dragging)  //当鼠标指针在指定的元素中移动时，就会发生 mousemove 事件。
carousel.addEventListener('touchmove', dragging) //当用户在屏幕上移动手指时会发生 touchmove 事件

carousel.addEventListener('mousedown', dragStart) //当鼠标指针移动到元素上方，并按下鼠标左键时，会发生 mousedown 事件
carousel.addEventListener('touchstart', dragStart) //当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发

carousel.addEventListener('mouseup', dragStop) //当鼠标指针移动到元素上方，并松开鼠标左键时，会发生 mouseup 事件
carousel.addEventListener('mouseleave', dragStop) //当鼠标指针离开被选元素时，会发生 mouseleave 事件
carousel.addEventListener('touchend', dragStop) //当手指从屏幕上离开的时候触发