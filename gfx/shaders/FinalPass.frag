#version 450

layout(set = 0, binding = 0) uniform texture2D SourceTexture;
layout(set = 0, binding = 1) uniform sampler SourceSampler;

layout(location = 0) in vec2 fsin_0;
layout(location = 0) out vec4 _outputColor;

void main()
{
    _outputColor = clamp(texture(sampler2D(SourceTexture, SourceSampler), fsin_0), 0, 1);
}
