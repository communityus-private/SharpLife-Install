#version 450

const float NoLightStyle = 255;
const int MaxLightStyles = 64;

layout(set = 0, binding = 3) uniform LightStyles
{
	float _LightStyles[MaxLightStyles];
};

layout(set = 1, binding = 0) uniform texture2D Texture;
layout(set = 1, binding = 1) uniform sampler Sampler;

layout(set = 2, binding = 0) uniform texture2D Lightmaps;

layout(location = 0) in vec3 fsin_0;
layout(location = 1) in vec2 textureCoords;
layout(location = 2) in vec2 LightmapCoords;
layout(location = 3) in flat ivec4 StyleIndices;

layout(location = 0) out vec4 OutputColor;

vec3 GetLightData(int styleIndex, int styleValueIndex)
{
	if (styleValueIndex == NoLightStyle)
	{
		return vec3(0, 0, 0);
	}
	
	vec2 lightmapCoords = LightmapCoords;
	lightmapCoords.x *= styleIndex + 1;

	return texture(sampler2D(Lightmaps, Sampler), lightmapCoords).rgb * _LightStyles[styleValueIndex];
}

void main()
{
	//All surfaces have at least one style
	//There is never a style following a NoLightStyle value
	vec3 lightData = GetLightData(0, StyleIndices.x);
	lightData += GetLightData(1, StyleIndices.y);
	lightData += GetLightData(2, StyleIndices.z);
	lightData += GetLightData(3, StyleIndices.w);
	
	//Gamma correction
	lightData = pow(lightData, (vec3(1.0 / 2.5)));
	
    OutputColor = texture(sampler2D(Texture, Sampler), textureCoords) * vec4(lightData, 1.0);
}
