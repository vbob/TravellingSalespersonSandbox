window.onload = async function () {
    let d3 = await 
    await import('/city.js')
    await import('/grid.js')
    await import('/tss.js')

    let grid = new Grid(d3)
    console.log(d3.select('body'))
}

