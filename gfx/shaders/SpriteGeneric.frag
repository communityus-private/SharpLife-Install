#version 450

const int RenderNormal = 0;
const int RenderTransColor = 1;
const int RenderTransTexture = 2;
const int RenderGlow = 3;
const int RenderTransAlpha = 4;
const int RenderTransAdd = 5;

layout(set = 0, binding = 4) uniform texture2D Texture;
layout(set = 0, binding = 5) uniform sampler Sampler;

layout(location = 0) in vec3 fsin_0;
layout(location = 1) in vec2 textureCoords;
layout(location = 2) flat in int RenderMode;
layout(location = 3) flat in vec4 RenderColor;

layout(location = 0) out vec4 OutputColor;

void main()
{
	OutputColor = texture(sampler2D(Texture, Sampler), textureCoords) * RenderColor;
}
