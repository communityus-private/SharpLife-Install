#version 450

layout(set = 0, binding = 3) uniform texture2D Texture;
layout(set = 0, binding = 4) uniform sampler Sampler;
layout(set = 0, binding = 5) uniform RenderColor
{
	vec4 _RenderColor;
};

layout(location = 0) in vec2 TextureCoords;

layout(location = 0) out vec4 OutputColor;

void main()
{
	OutputColor = texture(sampler2D(Texture, Sampler), TextureCoords) * _RenderColor;
}
