#version 450

layout(set = 1, binding = 0) uniform texture2D Texture;
layout(set = 1, binding = 1) uniform sampler Sampler;

layout(location = 0) in vec3 fsin_0;
layout(location = 1) in vec2 textureCoords;
layout(location = 0) out vec4 OutputColor;

void main()
{
    OutputColor = texture(sampler2D(Texture, Sampler), textureCoords);
}
