figma.showUI(__html__, {width: 240, height: 500, title: "Color Gradient"});

figma.ui.onmessage = msg => {
  if (msg.type === 'actionGenerate'){
    
    const {circleSize, circleSpacing, colorCode, colorName, frameDirection, tintNumber} = msg.formDataObj
    
    const parentFrame = figma.createFrame()
    parentFrame.name = colorName + ' color';

    parentFrame.layoutMode = frameDirection.toUpperCase() //режим компановки auto layout
    
    // отступы слева, справа, снизу и сверху 
    parentFrame.paddingLeft = 64  
    parentFrame.paddingRight = 64
    parentFrame.paddingBottom = 64
    parentFrame.paddingTop = 64

    parentFrame.itemSpacing = parseInt(circleSpacing)

    parentFrame.primaryAxisSizingMode = 'AUTO'
    parentFrame.counterAxisSizingMode = 'AUTO'
    
    for (let i = 0; i < tintNumber; i++){
      const tintNode = figma.createEllipse();

      tintNode.name = colorName + ' ' + (100-i*10)

      tintNode.resize(parseInt(circleSize), parseInt(circleSize));
      
      const hexToRgb = (hex: any) => {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      
        return result
          ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            } : null
      }
      
      const colorR = hexToRgb(colorCode).r / 255,
            colorG = hexToRgb(colorCode).g / 255,
            colorB = hexToRgb(colorCode).b / 255

      
      tintNode.fills = [{ type: 'SOLID', color: { r: colorR, g: colorG, b: colorB }}]

      tintNode.opacity = (100-i*10)/100 // прозрачность элемента

      parentFrame.appendChild(tintNode)

      const selectFrame: FrameNode[] = []
      selectFrame.push(parentFrame)

      figma.currentPage.selection = selectFrame
      figma.viewport.scrollAndZoomIntoView(selectFrame)
    }

    /*console.log(msg.formDataObj)*/
    figma.closePlugin('Tints generated successfully!');
  } else if (msg.type === 'actionExit'){
    figma.closePlugin();
  }
};
