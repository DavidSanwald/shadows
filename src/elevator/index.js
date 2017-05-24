import { css} from 'styled-components'


const shadowColors = {
  keyUmbra: 'rgba(0, 0, 0, 0.2)',
  keyPenumbra: 'rgba(0, 0, 0, 0.14)',
  ambient: 'rgba(0, 0, 0, 0.12)'
}


function ShadowMaker(x,y, blur, spread, color){
  const shadow = {
    init: function(x, y, blur, spread, color){
      this.x = Math.round(x)
      this.y = Math.round(y)
      this.blur = Math.round(blur)
      this.spread = Math.round(spread)
      this.color = color
      return this
    },
    get CSS(){
    return  `${this.x}px ${this.y}px ${this.blur}px ${this.spread}px ${this.color}`
    }
  }
    return Object.create(shadow).init(x,y, blur, spread, color)
  }

  const referenceShadows = [
    {
      elevation: 0,
      shadows: [
        ShadowMaker(0, 0, 0, 0, shadowColors.keyUmbra),
        ShadowMaker(0, 0, 0, 0, shadowColors.keyPenumbra),
        ShadowMaker(0, 0, 0, 0, shadowColors.ambient),
      ]
    },
    {
      elevation: 2,
      shadows: [
        ShadowMaker(0, 3, 1, -2, shadowColors.keyUmbra),
        ShadowMaker(0, 2, 2, 0, shadowColors.keyPenumbra),
        ShadowMaker(0, 1, 5, 0, shadowColors.ambient),
      ]
    },
    {
      elevation: 3,
      shadows: [
        ShadowMaker(0, 3, 3, -2, shadowColors.keyUmbra),
        ShadowMaker(0, 3, 4, 0, shadowColors.keyPenumbra),
        ShadowMaker(0, 1, 8, 0, shadowColors.ambient),
      ]
    },
    {
      elevation: 4,
      shadows: [
        ShadowMaker(0, 2, 4, -1, shadowColors.keyUmbra),
        ShadowMaker(0, 4, 5, 0, shadowColors.keyPenumbra),
        ShadowMaker(0, 1, 10, 0, shadowColors.ambient),
      ]
    },
    {
      elevation: 6,
      shadows: [
        ShadowMaker(0, 3, 5, -1, shadowColors.keyUmbra),
        ShadowMaker(0, 6, 10, 0, shadowColors.keyPenumbra),
        ShadowMaker(0, 1, 18, 0, shadowColors.ambient),
      ]
    },
    {
      elevation: 8,
      shadows: [
        ShadowMaker(0, 5, 5, -3, shadowColors.keyUmbra),
        ShadowMaker(0, 8, 10, 1, shadowColors.keyPenumbra),
        ShadowMaker(0, 3, 14, 2, shadowColors.ambient),
      ]
    },
    {
      elevation: 16,
      shadows: [
        ShadowMaker(0, 8, 10, -5, shadowColors.keyUmbra),
        ShadowMaker(0, 16, 24, 2, shadowColors.keyPenumbra),
        ShadowMaker(0, 6, 30, 5, shadowColors.ambient),
      ]
    }
  ];

  function interpolateShadow(x, shadow1, shadow2) {
    return ShadowMaker(
      linearInterpolate(x, shadow1.x, shadow2.x),
      linearInterpolate(x, shadow1.y, shadow2.y),
      linearInterpolate(x, shadow1.blur, shadow2.blur),
      linearInterpolate(x, shadow1.spread, shadow2.spread),
      shadow1.color
    );
  }

function linearInterpolate(x, a, b) {
  return a + x * (b - a);
}

function findBoundingShadowSets(elevation) {
  if (elevation < 0) {
    throw 'Shadows with negative elevation are impossible'
  }

  for (let i = 0; i < referenceShadows.length - 1; i++) {
    let lower = referenceShadows[i],
        upper = referenceShadows[i + 1];

    if (lower.elevation <= elevation && upper.elevation > elevation) {
      return [lower, upper];
    }
  }

  return referenceShadows.slice(-2);
}

function calculateShadowSetAtDepth(elevation) {
  let bounds = findBoundingShadowSets(elevation),
      min = bounds[0],
      max = bounds[1],
      x = (elevation - min.elevation) / (max.elevation - min.elevation),
      elevationShadows = [];

  for (let i = 0; i < min.shadows.length; i++) {
    elevationShadows.push(interpolateShadow(x, min.shadows[i], max.shadows[i]));
  }
  console.log(elevationShadows, "Yo")
  const chunk = `box-shadow:${elevationShadows[0].CSS}, ${elevationShadows[1].CSS}, ${elevationShadows[2].CSS}`
  console.log(chunk)
  return chunk;
}

export default function elevate(z) {
  return calculateShadowSetAtDepth(z)}
