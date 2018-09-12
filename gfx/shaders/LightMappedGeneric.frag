#version 450

struct LightingInfoStruct
{
	float MainGamma;
	float TextureGamma;
	float LightingGamma;
	float Brightness;
};

const float NoLightStyle = 255;
const int MaxLightStyles = 64;
const int MaxStylesPerSurface = 4;

const int RenderModeNormal = 0;
const int RenderModeTransColor = 1;
const int RenderModeTransTexture = 2;
const int RenderModeTransGlow = 3;
const int RenderModeTransAlpha = 4;
const int RenderModeTransAdd = 5;

layout(set = 0, binding = 3) uniform LightingInfo
{
	LightingInfoStruct _LightingInfo;
};

layout(set = 0, binding = 4) uniform LightStyles
{
	float _LightStyles[MaxLightStyles];
};

layout(set = 0, binding = 5) uniform RenderColor
{
	vec4 _RenderColor;
	int _RenderMode;
};

layout(set = 1, binding = 0) uniform texture2D Texture;
layout(set = 1, binding = 1) uniform sampler Sampler;

layout(set = 2, binding = 0) uniform texture2D Lightmaps;

layout(location = 0) in vec2 TextureCoords;
layout(location = 1) in vec2 LightmapCoords;
layout(location = 2) in flat float LightmapXOffset;
layout(location = 3) in flat ivec4 StyleIndices;

layout(location = 0) out vec4 OutputColor;

vec3 GetLightData(int styleIndex)
{	
	vec2 lightmapCoords = LightmapCoords;
	lightmapCoords.x += LightmapXOffset * styleIndex;

	return texture(sampler2D(Lightmaps, Sampler), lightmapCoords).rgb * _LightStyles[StyleIndices[styleIndex]];
}

//Compute the gamma value for the given texture value
float TextureGamma(float value)
{
	return clamp(pow(value, _LightingInfo.TextureGamma * (1.0 / _LightingInfo.MainGamma)), 0.0, 1.0);
}

//Compute the gamma value for the given lighting value
float LightingGamma(float value)
{
	float g3 = 0.125 - _LightingInfo.Brightness * _LightingInfo.Brightness * 0.075;

	float f = pow(value, _LightingInfo.LightingGamma);

	if(_LightingInfo.Brightness > 1.0)
	{
		f *= _LightingInfo.Brightness;
	}
	
	float base;

	if( g3 >= f )
	{
		base = (f / g3) * 0.125;
	}
	else
	{
		base = (((f - g3) / (1.0 - g3)) * 0.875) + 0.125;
	}

	float result = pow(base, 1.0 / _LightingInfo.MainGamma);

	return max(0.0, result);
}

void main()
{
	//Color render mode ignores all texture and lighting data, and is not gamma corrected
	if (_RenderMode == RenderModeTransColor)
	{
		OutputColor = _RenderColor;
		return;
	}
	
	vec4 color = texture(sampler2D(Texture, Sampler), TextureCoords) * _RenderColor;
	
	//Discard early if the fragment is invisible
	if (_RenderMode == RenderModeTransAlpha && color.a <= 0.25)
	{
		discard;
	}

	//All surfaces have at least one style
	vec3 lightData = GetLightData(0);
	
	for (int i = 1; i < MaxStylesPerSurface; ++i)
	{
		//There is never a style following a NoLightStyle value
		if (StyleIndices[i] == NoLightStyle)
		{
			break;
		}
		
		lightData += GetLightData(i);
	}
	
	//Gamma correction
	for (int i = 0; i < 3; ++i)
	{
		color[i] = TextureGamma(color[i]);
		lightData[i] = LightingGamma(lightData[i]);
	}
	
    OutputColor = color * vec4(lightData, 1.0);
}
