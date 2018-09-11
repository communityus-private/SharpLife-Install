#version 450

const float NoLightStyle = 255;
const int MaxLightStyles = 64;
const int MaxStylesPerSurface = 4;

layout(set = 0, binding = 3) uniform LightStyles
{
	float _LightStyles[MaxLightStyles];
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

void main()
{
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
	lightData = pow(lightData, (vec3(1.0 / 2.5)));
	
    OutputColor = texture(sampler2D(Texture, Sampler), TextureCoords) * vec4(lightData, 1.0);
}
