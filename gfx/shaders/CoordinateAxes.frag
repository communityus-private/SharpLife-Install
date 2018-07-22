#version 450

layout(location = 0) in vec3 fsin_0;
layout(location = 1) in vec3 fsColor;
layout(location = 0) out vec4 OutputColor;

void main()
{
    OutputColor = vec4(fsColor, 1.0f);
}
