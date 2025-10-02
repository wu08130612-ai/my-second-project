console.log('hello three.js')

// 测试Three.js是否正常加载
if (typeof THREE !== 'undefined') {
    console.log('Three.js 加载成功！版本:', THREE.REVISION)
    console.log('THREE对象:', THREE)
} else {
    console.error('Three.js 加载失败！')
}
// 场景
const scene = new THREE.Scene()
//red cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
//size
const size = {
    width: 800,
    height: 600
}

 //camera
const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 1000)   
camera.position.z = 3 
scene.add(camera)
// renderer  
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.webgl')
}) 
console.log(renderer) 
renderer.setSize(size.width, size.height)
renderer.render(scene, camera) 